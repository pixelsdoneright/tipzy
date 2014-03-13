var tipzyapp = {};
tipzyapp.webdb = {};
tipzyapp.webdb.db = null;

tipzyapp.webdb.open = function() {
    var dbSize = 5 * 1024 * 1024; // 5MB
    if(!tipzyapp.webdb.db)
        tipzyapp.webdb.db = openDatabase("tipzydata", "1.0", "Tipzy Data Cache", dbSize);
}

tipzyapp.webdb.prepare = function() {
    var db = tipzyapp.webdb.db;
        db.transaction(function(tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS config(id INTEGER PRIMARY KEY ASC, property TEXT, value TEXT)", []);
        });
}

tipzyapp.webdb.loadDefaultConfig = function() {
    var config = {
        currency_pattern: '$',
        currency_format: '###,##.##',
        currency_country: 'USA',
        rating_1_label: 'Shitty',
        rating_1_tip: '0.0',
        rating_2_label: 'Whatevz',
        rating_2_tip: '0.10',
        rating_3_label: 'Kewl',
        rating_3_tip: '0.12',
        rating_4_label: 'Awezome!',
        rating_4_tip: '0.15',
    };

    var db = tipzyapp.webdb.db;
        db.transaction(function(tx) {
            for (var property in config) {
                tx.executeSql("INSERT INTO config(property, value) VALUES (?, ?)", 
                    [property, config[property]],
                    tipzyapp.webdb.onSuccess,
                    tipzyapp.webdb.onError);
            }
            tipzyapp.webdb.getConfig();
        });
};

tipzyapp.webdb.onError = function(tx, e) {
    console.log("There has been an error: " + e.message);
};

tipzyapp.webdb.onSuccess = function(tx, r) {
    var x = tx;
    var y = r;
    // re-render the data.
    //tipzyapp.webdb.getAllTodoItems(loadTodoItems);
};

// var uc = function(){
//     abc = currency;
//     abc[0].value = 'Rs';
//     abc[2].value = 'India';
//     tipzyapp.webdb.updateConfig(abc);
// }

// var updateConfig = function(cfg) {

//     var db = $rootScope.webdb.db;
//         db.transaction(function(tx) {
//             for (var i=0; i < cfg.length; i++) {
//                 tx.executeSql("UPDATE config SET property=?, value=? WHERE id = ?", 
//                 [cfg[i].property, cfg[i].value, cfg[i].id], 
//                 $rootScope.webdb.onSuccess,
//                 $rootScope.webdb.onError); 
//             }
//         });
// };