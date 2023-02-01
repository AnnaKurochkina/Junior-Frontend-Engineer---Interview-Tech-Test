import { useState, useEffect } from "react";
import Papa, { LocalFile, ParseResult } from "papaparse";
import "./App.scss";

const datasample = require("./Assets/datasample.csv") as LocalFile;

interface DataRecord {
    Date: string;
    Country: string;
    App: string;
    Platform: string;
    AdNetwork: string;
    DailyUsers: string;
}

const App = () => {
	const [data, setData] = useState<DataRecord[]>([]);

	function GetData(datasample: LocalFile) {
        const data = Papa.parse<DataRecord>(datasample, {
            download: true,
            header: true,
            complete: (results: ParseResult<DataRecord>) => {
                const data = results.data;
                setData(data);
            },
        });
        return data;
    }

	useEffect(() => {
        GetData(datasample);
    }, []);

	console.log(data);

    return <div className="App">
		{data.map((record) => (
                <div className="grid-container">
                    <div className="grid-item">{record.Date}</div>
                    <div className="grid-item">{record.Country}</div>
                    <div className="grid-item">{record.App}</div>
                    <div className="grid-item">{record.AdNetwork}</div>
                    <div className="grid-item">{record.Platform}</div>
                    <div className="grid-item">{record.DailyUsers}</div>
                </div>
            ))}
		</div>;
}

export default App;
