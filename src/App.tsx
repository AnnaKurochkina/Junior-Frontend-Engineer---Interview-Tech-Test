import { useState, useEffect } from "react";
import Papa from "papaparse";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import "./App.scss";

const datasample = require("./Assets/datasample.csv");

const App = () => {
	const [data, setData] = useState([]);
	const [country, setCountry] = useState("");
	const [date, setDate] = useState("");
	const [app, setApp] = useState("");
	const [adNetwork, setAdNetwork] = useState("");
	const [platform, setPlatform] = useState("");
	const [splitBy, setSplitBy] = useState("");
	const [display, setDisplay] = useState("chart");

	useEffect(() => {
		Papa.parse(datasample, {
			download: true,
			dynamicTyping: true,
			header: true,
			complete: (results) => setData(results.data)
		});
	}, []);

	const colours = [
		"violet",
		"pink",
		"purple",
		"cyan",
		"crimson",
		"coral",
		"aquamarine",
		"deeppink",
		"cadetblue",
		"cornflowerblue",
		"red",
		"orange",
		"yellow",
		"green",
		"blue",
		"indigo"
	];

	const countries = [...new Set(data.map((record) => record.Country))];
	const dates = [...new Set(data.map((record) => record.Date))];
	const apps = [...new Set(data.map((record) => record.App))];
	const adNetworks = [...new Set(data.map((record) => record.AdNetwork))];
	const platforms = [...new Set(data.map((record) => record.Platform))];
	const splitBys = ["Country", "App", "AddNetwork", "Platform"];

	const filteredData = data.filter(
		(record) =>
			(record.Country === country || country === "") &&
			(record.Date === date || date === "") &&
			(record.App === app || app === "") &&
			(record.AdNetwork === adNetwork || adNetwork === "") &&
			(record.Platform === platform || platform === "")
	);

	const filteredDates = [...new Set(filteredData.map((record) => record.Date))];
	const filteredCountries = [...new Set(filteredData.map((record) => record.Country))];
	const filteredApps = [...new Set(filteredData.map((record) => record.App))];
	const filteredAdNetworks = [...new Set(filteredData.map((record) => record.AdNetwork))];
	const filteredPlatforms = [...new Set(filteredData.map((record) => record.Platform))];

	const sum = (items) => items.reduce((total, current) => total + current, 0);

	let datasets = [];

	if (splitBy === "") {
		datasets = [
			{
				label: "Combined",
				data: filteredDates.map((date) => {
					var filtered = filteredData.filter((record) => record.Date === date);
					var mapped = filtered.map((record) => record.DailyUsers);
					return sum(mapped);
				}),
				backgroundColor: colours[0]
			}
		];
	} else if (splitBy === "Country") {
		datasets = filteredCountries.map((country, index) => ({
			label: country,
			data: filteredDates.map((date) => {
				var filtered = filteredData.filter((record) => record.Date === date && record.Country === country);
				var mapped = filtered.map((record) => record.DailyUsers);
				return sum(mapped);
			}),
			backgroundColor: colours[index % colours.length]
		}));
	} else if (splitBy === "App") {
		datasets = filteredApps.map((app, index) => ({
			label: app,
			data: filteredDates.map((date) => {
				var filtered = filteredData.filter((record) => record.Date === date && record.App === app);
				var mapped = filtered.map((record) => record.DailyUsers);
				return sum(mapped);
			}),
			backgroundColor: colours[index % colours.length]
		}));
	} else if (splitBy === "AddNetwork") {
		datasets = filteredAdNetworks.map((adNetwork, index) => ({
			label: adNetwork,
			data: filteredDates.map((date) => {
				var filtered = filteredData.filter((record) => record.Date === date && record.AdNetwork === adNetwork);
				var mapped = filtered.map((record) => record.DailyUsers);
				return sum(mapped);
			}),
			backgroundColor: colours[index % colours.length]
		}));
	} else if (splitBy === "Platform") {
		datasets = filteredPlatforms.map((platform, index) => ({
			label: platform,
			data: filteredDates.map((date) => {
				var filtered = filteredData.filter((record) => record.Date === date && record.Platform === platform);
				var mapped = filtered.map((record) => record.DailyUsers);
				return sum(mapped);
			}),
			backgroundColor: colours[index % colours.length]
		}));
	}

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const
			},
			title: {
				display: true,
				text: "Daily active users"
			}
		}
	};

	const chartData = {
		labels: filteredDates,
		datasets: datasets
	};

	ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

	return (
		<div className="App">
			<label>Country: </label>
			<select onChange={(event) => setCountry(event.target.value)}>
				<option value="">All countries</option>
				{countries.map((country) => (
					<option value={country}>{country}</option>
				))}
			</select>
			<label>Date: </label>
			<select onChange={(event) => setDate(event.target.value)}>
				<option value="">All dates</option>
				{dates.map((date) => (
					<option value={date}>{date}</option>
				))}
			</select>
			<label>App: </label>
			<select onChange={(event) => setApp(event.target.value)}>
				<option value="">All apps</option>
				{apps.map((app) => (
					<option value={app}>{app}</option>
				))}
			</select>
			<label>Ad network: </label>
			<select onChange={(event) => setAdNetwork(event.target.value)}>
				<option value="">All ad networks</option>
				{adNetworks.map((network) => (
					<option value={network}>{network}</option>
				))}
			</select>
			<label>Platform: </label>
			<select onChange={(event) => setPlatform(event.target.value)}>
				<option value="">All platforms</option>
				{platforms.map((platform) => (
					<option value={platform}>{platform}</option>
				))}
			</select>
			<label>Split by: </label>
			<select onChange={(event) => setSplitBy(event.target.value)}>
				<option value="">Nothing</option>
				{splitBys.map((splitBy) => (
					<option value={splitBy}>{splitBy}</option>
				))}
			</select>
			<label>Display: </label>
			<select onChange={(event) => setDisplay(event.target.value)}>
				<option value="chart">Chart</option>
				<option value="table">Table</option>
			</select>
			{display === "chart" ? (
				<Bar options={options} data={chartData} />
			) : (
				<div>
					<div className="grid-header">
						<div className="grid-item">Date</div>
						<div className="grid-item">Country</div>
						<div className="grid-item">App</div>
						<div className="grid-item">AdNetwork</div>
						<div className="grid-item">Platform</div>
						<div className="grid-item">DailyUsers</div>
					</div>
					{filteredData.map((record) => (
						<div className="grid-container">
							<div className="grid-item">{record.Date}</div>
							<div className="grid-item">{record.Country}</div>
							<div className="grid-item">{record.App}</div>
							<div className="grid-item">{record.AdNetwork}</div>
							<div className="grid-item">{record.Platform}</div>
							<div className="grid-item">{record.DailyUsers}</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default App;
