var tipzyapp = {};
tipzyapp.webdb = {};
tipzyapp.webdb.db = null;

tipzyapp.webdb.open = function() {
    var dbSize = 5 * 1024 * 1024; // 5MB
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

tipzyapp.webdb.getConfig = function() {
    config = [];
    var db = tipzyapp.webdb.db;
        db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM config", [], function(tx, rs){
                for (var i=0; i < rs.rows.length; i++) {
                    var item = rs.rows.item(i);

                    config.push(item);

                    if(item.property.search('rating') >= 0)
                        rating.push(item);

                    if(item.property.search('currency') >= 0)
                        currency.push(item);
                }
            },
            tipzyapp.webdb.onError);
        });
};

tipzyapp.webdb.updateConfig = function(cfg) {

    var db = tipzyapp.webdb.db;
        db.transaction(function(tx) {
            for (var i=0; i < cfg.length; i++) {
                tx.executeSql("UPDATE config SET property=?, value=? WHERE id = ?", 
                [cfg[i].property, cfg[i].value, cfg[i].id], 
                tipzyapp.webdb.onSuccess,
                tipzyapp.webdb.onError); 
            }
        });
};

var uc = function(){
    abc = currency;
    abc[0].value = 'Rs';
    abc[2].value = 'India';
    tipzyapp.webdb.updateConfig(abc);
}

function init() {
    //tipzyapp.webdb.open();
    //tipzyapp.webdb.prepare();
    //tipzyapp.webdb.getAllTodoItems(loadTodoItems);
};