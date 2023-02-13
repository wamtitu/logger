const fs = require('fs');

const menu = JSON.parse(fs.readFileSync(`${__dirname}/menu.json`));
console.log(menu);

exports.getAllMenu = (req, res)=>{
    res.status(200).json({
        status: 'sucess',
        results: menu.lenght,
        data: {
            menu
        }
    })
};
exports.getOneMenu = (req, res)=>{

    const id = req.params.id *1;
    if(id > menu.length){
        res.status(404).json({
            status: 'fail',
            message: 'invalid id'
        })
    }
    const menu1 = menu.find(el=> el.id ===req.params.id);
    res.status(200).json({
        status: 'sucess',
        data: {
            menu1
        }
    })
};
exports.addToMenu = (req, res)=>{
    const newMenu = req.body;
    console.log(req.body)
    menu.push(newMenu);
    fs.writeFile(`${__dirname}/menu.json`, JSON.stringify(menu), err=>{
        res.status(201).json({
            status: 'sucess',
            data: {
                menu: newMenu
            }
        })
    }
    );
    //res.send('done')
    
};
exports.updateMenu = (req, res)=>{
    if(!req.params.id>menu.lenght){
        res.status(404).json({
            status: 'fail',
            message: 'invalid id'
        })
    }
    res.status(200).json({
        status: 'sucess',
        data: {
            menu: "<updated menu...>"
        }
    })
};
exports.deleteMenu = (req, res)=>{
    (req, res)=>{
        if(!req.params.id>menu.lenght){
            res.status(404).json({
                status: 'fail',
                message: 'invalid id'
            })
        }
        res.status(404).json({
            status: 'sucess',
            data: {
            }
        })
    };
}