var adminUrl = 'http://tp5.com/admin';
var ajaxUrl = {
    getMenuList: adminUrl + '/category/getMenuList',  // 菜单
    addMenu: adminUrl + '/category/addMenu',
    editMenu: adminUrl + '/category/editMenu',
    deleteMenu: adminUrl + '/category/deleteMenu',
    getTagList:adminUrl + '/tag/getTagList',           // 标签
    addTag: adminUrl + '/tag/addTag',
    banTag:adminUrl + "/tag/banTag",
    openTag:adminUrl + "/tag/openTag",
    addBlog:adminUrl + "/blog/insert",             // blog
    editBlog:adminUrl + "/blog/update",
    getBlogList:adminUrl+"/blog/getList",
    getUserList:adminUrl+"/user/getList",
    addUser:adminUrl+"/user/add",              //user
    editUser:adminUrl+"/user/edit",
    delUser:adminUrl+"/user/delete",
    assignRole:adminUrl+"/user/assignRole",
    deleteUserRole:adminUrl+"/user/deleteUserRole",
    getRoleList:adminUrl+"/role/getList",       // role
    addRole:adminUrl+"/role/add",
    editRole:adminUrl+"/role/edit",
    delRole:adminUrl+"/role/delete",
    assignPermission:adminUrl+"/role/assignPermission",
    deleteRolePermission:adminUrl+"/role/deleteRolePermission",
    getPermissionList:adminUrl+"/permission/getList",   // permission
    addPermission:adminUrl+"/permission/add",
    editPermission:adminUrl+"/permission/edit",
    delPermission:adminUrl+"/permission/delete",
    login:adminUrl+"/login/dologin"
};