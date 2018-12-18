$(function(){
    'use strict';

    Morris.Donut({
        element: 'chartkit-donut',
        data: [
            {label: 'Jam', value: 25 },
            {label: 'Frosted', value: 40 },
            {label: 'Custard', value: 25 },
            {label: 'Sugar', value: 10 }
        ],
        formatter: function (y) { return y + '%'; },
        resize: true
    });
    
    Morris.Donut({
        element: 'chartkit-donut2',
        data: [
            {label: 'Jam', value: 25 },
            {label: 'Frosted', value: 40 },
            {label: 'Custard', value: 25 },
            {label: 'Sugar', value: 10 }
        ],
        backgroundColor: '#202D3B',
        labelColor: '#ecf0f1',
        formatter: function (y) { return y + '%'; },
        colors: [ '#229955', '#20638f', '#d14233', '#e08e0b' ],
        resize: true
    });
});