export default {
    /**
     * 微服务名
     */
    GDPM_USER : '/gdpm-user',
    GDPM_FILE: '/gdpm-file',
    GDPM_ADMIN: '/gdpm-admin',
    GDPM_ES: '/gdpm-es',
    GDPM_EMAIL: '/gdpm-email',
    GDPM_STUDENT: '/gdpm-student',
    GDPM_TEACHER: '/gdpm-teacher',
    GDPM_DIRECTOR: '/gdpm-director',

    /**
     * POST提交方式
     * 
     * application/x-www-form-urlencoded
     * 默认选择方式,提交的数据按照 key1=val1&key2=val2 的方式进行编码，key 和 val 都进行了 URL 转码
     * 
     * multipart/form-data
     * 使用表单上传文件时，必须让 <form> 表单的 enctype 属性值等于 multipart/form-data
     * 
     * application/json
     * 告诉服务端消息主体是序列化后的 JSON 字符串,可以方便的提交复杂的结构化数据，特别适合 RESTful 的接口
     * 
     * text/xml
     * 是一种使用 HTTP 作为传输协议，XML 作为编码方式的远程调用规范
     * 
     */
    POST_HEADER_URLENCODED : 'application/x-www-form-urlencoded;charset=UTF-8',
    POST_HEADER_DATA : 'multipart/form-data',
    POST_HEADER_JSON : 'application/json',
    POST_HEADER_XML : 'text/xml',

    token : 'token',

    stateMap: [  //  审批状态
        { label: '未开始', value: 0, cssName: 'warning' },
        { label: '审核中', value: 1, cssName: 'primary' },
        { label: '通过', value: 2, cssName: 'success' },
        { label: '未通过', value: 3, cssName: 'danger' },
    ],

    announcementMap: [
        { label: '系公告', value: 4, cssName: 'danger' },
        { label: '教师公告', value: 2, cssName: 'warning' },
    ],

    importFlag: {  //  管理员导入表格的区分
        department: 1,
        professional: 2,
        teacher: 3,
        student: 4,
        history: 5
    }
}