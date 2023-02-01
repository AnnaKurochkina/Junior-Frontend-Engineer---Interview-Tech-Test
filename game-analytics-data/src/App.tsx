import { useState, useEffect } from "react";
import Papa, { LocalFile } from "papaparse";
import "./App.scss";

const datasample = require("./Assets/datasample.csv") as LocalFile;

const App = () => {
	const [data, setData] = useState([]);

	function GetData(datasample: LocalFile) {
        const data = Papa.parse(datasample, {
            download: true,
            header: true,
            complete: (results: any) => {
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
		Hello
		</div>;
}

export default App;
