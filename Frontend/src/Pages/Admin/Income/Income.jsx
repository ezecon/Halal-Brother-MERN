import  React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Button, Dialog, DialogBody, DialogHeader, Input } from '@material-tailwind/react';

const IncomeComponent = () => {
    const [open, setOpen] = React.useState(false);
 
    const handleOpen = () => setOpen(!open);
    const [to, setTo] = useState('');
    const [from, setFrom] = useState('');
    const [total, setTotal] = useState(0);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.get('https://halal-brother-server.vercel.app/api/incomes', {
          params: {
            to,
            from,
          },
        });
  
        if (response.status === 200) {
          const fetchedData = response.data.map((item) => ({
            ...item,
            time: new Date(item.date).toISOString().slice(11, 16), // Extract time in HH:MM format
          }));
          toast.success('Data fetched successfully!');
          setTo('');
          setFrom('');
  
          const totalIncome = fetchedData.reduce((acc, item) => acc + item.income, 0);
          setTotal(totalIncome);
          handleOpen();
        }
      } catch (error) {
        toast.error('Failed to fetch data. Please try again.');
      }
    };


  return (
    <div className="flex items-center justify-center">
            <div className="bg-white py-5 px-8 rounded-lg w-2/3">
                    <h1 className="text-2xl font-semibold mb-4 text-center">Item Post</h1>
                    <form className="p-4 space-y-4" onSubmit={handleSubmit}>
                        <div className="w-full">
                                <Input
                                type="date"
                                required
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                                label="From"
                                />
                            </div>

                            <div className="w-full">
                                <Input
                                type="date"
                                required
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                label="To"
                                />
                            </div>

                            <div className="text-center">
                                <Button type="submit">Search</Button>
                            </div>
                    </form>
                    <div>
                            <Dialog open={open} handler={handleOpen}>
                                <DialogHeader>Income.</DialogHeader>
                                <DialogBody>
                                <p><span className='font-bold crimson'>Income In This Period: </span> {total}</p>
                                </DialogBody>
                            </Dialog>
                    </div>
            </div>
      </div>
  );
};

export default IncomeComponent;
