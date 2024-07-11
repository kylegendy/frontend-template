import { Button } from "@material-tailwind/react";
import LoadingImage from '../general/loadingImage';

function ExampleComponent() {

    return (
        <div>
            <h1>hi there</h1>
            <div className="bg-blue-500 text-white p-4 rounded">
                Hello, Tailwind CSS!
            </div>
            <Button className="bg-red-500 text-white p-4 rounded">hello world</Button>
            <LoadingImage imgAttributes={{
                src: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c2ffb745-5290-44d7-b9ea-cf453d7a8cbe/dhp9y69-b40f121d-f094-4a45-bc54-6d116cb8cfdb.jpg/v1/fill/w_894,h_894,q_70,strp/snoodle_by_mac4tu_dhp9y69-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2MyZmZiNzQ1LTUyOTAtNDRkNy1iOWVhLWNmNDUzZDdhOGNiZVwvZGhwOXk2OS1iNDBmMTIxZC1mMDk0LTRhNDUtYmM1NC02ZDExNmNiOGNmZGIuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.3m9PMnlXOZmdVJJCDB1HtfbCCyZVrQbO8oLDaEiXl5M',
                style: {
                    objectFit: 'contain',
                    height: '100%'
                }
            }}/>
        </div>
    );
};

export default ExampleComponent;