// // src/components/TreemapComponent.js
// "use client";
// import React from 'react';
// import Plot from 'react-plotly.js';

// const TreemapComponent = ({ data, marketCaps }) => {
//     // Map data to the format required by Plotly
//     const labels = data.map(stock => stock.symbol);
//     const values = data.map(stock => marketCaps[stock.symbol] || 1); // Default to 1 if market cap is missing
//     const colors = data.map(stock => stock.percentage_change > 0 ? 'green' : 'red');
//     const texts = data.map(stock => `${stock.symbol}<br>${stock.percentage_change}%`);

//     return (
//         <Plot
//             data={[
//                 {
//                     type: 'treemap',
//                     labels: labels,
//                     parents: Array(data.length).fill(''),  // No hierarchical structure
//                     values: values,
//                     text: texts,
//                     marker: {
//                         colors: colors,
//                     },
//                     textinfo: 'label+text',
//                 }
//             ]}
//             layout={{
//                 margin: { t: 0, l: 0, r: 0, b: 0 },
//                 paper_bgcolor: 'rgba(0,0,0,0)', // Transparent background
//                 plot_bgcolor: 'rgba(0,0,0,0)',
//             }}
//             style={{ width: '250%', height: '100%' }}
//         />
//     );
// };

// export default TreemapComponent;


"use client";
import React from 'react';
import Plot from 'react-plotly.js';

const TreemapComponent = ({ data, marketCaps }) => {
    const labels = data.map(stock => stock.symbol);
    const values = data.map(stock => marketCaps[stock.symbol] || 1); // Default to 1 if market cap is missing
    const colors = data.map(stock => stock.percentage_change > 0 ? 'green' : 'red');
    const texts = data.map(stock => `${stock.symbol}<br>${stock.percentage_change}%`);

    return (
        <div style={{ width: '250%', height: '80vh' }}> {/* Adjust height here */}
            <Plot
                data={[
                    {
                        type: 'treemap',
                        labels: labels,
                        parents: Array(data.length).fill(''),
                        values: values,
                        text: texts,
                        marker: {
                            colors: colors,
                        },
                        textinfo: 'label+text',
                    }
                ]}
                layout={{
                    margin: { t: 0, l: 0, r: 0, b: 0 },
                    paper_bgcolor: 'rgba(0,0,0,0)', // Transparent background
                    plot_bgcolor: 'rgba(0,0,0,0)',
                }}
                style={{ width: '100%', height: '100%' }} // Ensure Plotly fills its container
                useResizeHandler={true} // Enable resizing
                config={{ responsive: true }} // Enable responsive mode
            />
        </div>
    );
};

export default TreemapComponent;
