import {
    values
} from "lodash";

/**
 * 枚举对象
 *
 */
export default {

    // 文件类型
    fileType: {
        '1': 'excel文件',
        '2': '图片',
        '3': 'apk文件',
        '0': '其它'
    },
    thisUrl:'http://localhost:8080/',
    echartUrl: {
        url: 'https://cdn.jsdelivr.net/npm/echarts@4.9.0/dist/echarts.min.js'
    },
    ledgerType: null,
    ledgerStat: null,
    ledgerCycleType: null,
    ledgerDealWay: null,
    ledgerReportWay: null,
    devStat: null,
    factoryType: null,
    msgType: null,
    msgSubType: null,
    msgSendType: null,
    mapKey: null,
    idCardORC: null,
    role: null,
    efaceStatus: null,
    mtypes: null,
    cameraRunStat: {
        1: "在线",
        2: "离线"
    }
}