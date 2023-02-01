# Junior Frontend Engineer - Interview Tech Test
## Requirements
We require a charting system that is informative and simple to navigate to display our current
analytics data for our games. Your task is to create this interface which will have time along the
X axis and the selected dataset’s scale on the Y axis.
### Features required are:
- ability to switch between datasets (e.g. different games, different events)
- ability to easily select date ranges and time periods
- display the data for a date range as a chart and a table
- plot a horizontal target line which changes colour when the last element in the date
range is above or below that line. The user will require an interface to set the value of the
target line and the line colour.
### The interface should:
- be responsive
- be easy to navigate & focus on desirable data
- have a clean and uncluttered style
- work on large displays or on a mobile phone
### Additional info:
- Please read from the accompanying data file, which is currently in csv format.
- Time allowed is 4 hours. Should you wish to complete any additional work on this project
after 4 hours, please do so on a clearly marked branch.
If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

* Used Papaparse to read csv file.
* Used Chart.js and react-chartjs-2 to draw a chart.
* Didn't have enough time to do horisontal target line.
