App.Data = (function(lng, app, undefined) {
	
	  //CONFIG: Data.Sql
    lng.Data.Sql.init({
        name: 'todo.js',
        version: '1.0',
        schema: [
            { name: 'todo', drop: false, fields: {
                id: 'INTEGER PRIMARY KEY',
                name: 'TEXT',
                description: 'TEXT',
                type: 'STRING',
                done: 'INTEGER DEFAULT 0',
                created_at: 'DATETIME'
                }
            },
            { name: 'users', drop: false, fields: {
                id: 'INTEGER PRIMARY KEY',
                usuario: 'TEXT',
				password: 'TEXT'
                }
            }
        ]
    });

    var insertTodo = function(data) {
        lng.Data.Sql.insert('todo', data);
		refresh();
    };
	
	 var insertUser = function(data) {
        lng.Data.Sql.insert('users', data);
    };

    var removeTodo = function(id) {
        lng.Data.Sql.drop('todo', {id:id});
    };

    var updateTodo = function(id, data) {
        lng.Data.Sql.update('todo', data, {id:id});
        refresh();
    };

    var doneTodo = function(id) {
        lng.Data.Sql.update('todo', {done:1}, {id:id});
    };
	
	var refresh = function() {
        _pendingTodos();
        _doneTodos();
    };
	
	var _pendingTodos = function() {
        lng.Data.Sql.select('todo', {done:0}, function(result) {
            App.View.list('#pending', 'pending-tmp', result);
        });
    };
	
	 var _doneTodos = function() {
        lng.Data.Sql.select('todo', {done:1}, function(result){
            App.View.list('#done', 'list-tmp', result);
        });
    };
	
    return {
		refresh: refresh,
        insertTodo: insertTodo,
        removeTodo: removeTodo,
        updateTodo: updateTodo,
        doneTodo: doneTodo,
		insertUser: insertUser
    }

})(LUNGO, App);