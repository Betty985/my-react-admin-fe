import type { EChartsOption } from './component';
const ROOT_PATH = 'https://echarts.apache.org/examples';
export const stackedOpt: EChartsOption = {
    tooltip: {
        trigger: 'axis',
    },
    backgroundColor: 'transparent',
    legend: {
        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
    },
    toolbox: {
        feature: {
            saveAsImage: {},
        },
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
        type: 'value',
        alignTicks: true,
    },
    series: [
        {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
    ],
};
export const earthOpt: EChartsOption = {
    backgroundColor: 'transparent',
    globe: {
        baseTexture: ROOT_PATH + '/data-gl/asset/world.topo.bathy.200401.jpg',
        // heightTexture: ROOT_PATH + '/data-gl/asset/world.topo.bathy.200401.jpg',
        displacementScale: 0.04,
        shading: 'realistic',
        // environment: ROOT_PATH + '/data-gl/asset/starfield.jpg',
        realisticMaterial: {
            roughness: 0.9,
        },
        postEffect: {
            enable: true,
        },
        light: {
            main: {
                intensity: 5,
                shadow: true,
            },
            ambientCubemap: {
                texture: ROOT_PATH + '/data-gl/asset/pisa.hdr',
                diffuseIntensity: 0.2,
            },
        },
    },
};
export const mapOpt: any = {
    visualMap: {
        min: 0,
        max: 1000,
        left: 'left',
        top: 'bottom',
        text: ['???', '???'],
        calculable: false,
        orient: 'horizontal',
        inRange: {
            color: ['#e0ffff', '#006edd'],
            symbolSize: [30, 100],
        },
    },
    series: [
        {
            name: '??????????????????',
            type: 'map',
            mapType: 'china',
            itemStyle: {
                normal: {
                    label: {
                        show: false,
                    },
                },
                emphasis: {
                    label: {
                        show: true,
                    },
                    areaColor: 'blue',
                },
            },
            label: {
                normal: {
                    //???????????????????????????
                    show: true, //?????????????????????????????????
                    textStyle: {
                        color: '#fff',
                        fontSize: 12,
                    },
                },
                emphasis: {
                    //?????????????????????
                    color: '#fff',
                },
            },
            data: [
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '?????????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '?????????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
                {
                    name: '??????',
                    value: Math.round(Math.random() * 1000),
                    tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
                },
            ],
        },
    ],
};
