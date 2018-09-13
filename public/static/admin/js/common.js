var url = 'http://tp5.com/admin';
var ajaxUrl = {
    getMenuList: url + '/category/getMenuList',  // 菜单
    addMenu: url + '/category/addMenu',
    editMenu: url + '/category/editMenu',
    deleteMenu: url + '/category/deleteMenu',
    getTagList:url + '/tag/getTagList',           // 标签
    addTag: url + '/tag/addTag',
    banTag:url + "/tag/banTag",
    openTag:url + "/tag/openTag",
    addBlog:url + "/blog/addBlog",             // blog
    getBlogList:url+"/blog/getBlogList",
    getUserList:url+"/user/getList",
    addUser:url+"/user/add",              //user
    editUser:url+"/user/edit",
    delUser:url+"/user/delete",
    assignRole:url+"/user/assignRole",
    deleteUserRole:url+"/user/deleteUserRole",
    getRoleList:url+"/role/getList",       // role
    addRole:url+"/role/add",
    editRole:url+"/role/edit",
    delRole:url+"/role/delete",
    assignPermission:url+"/role/assignPermission",
    deleteRolePermission:url+"/role/deleteRolePermission",
    getPermissionList:url+"/permission/getList",   // permission
    addPermission:url+"/permission/add",
    editPermission:url+"/permission/edit",
    delPermission:url+"/permission/delete",
};