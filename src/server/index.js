import Express from 'express';

import init from './init'
const app = new Express();
const PORT = 4000;
init(app).then((data)=>{

	console.log(data,'data');
	app.listen(PORT, ()=>{
		console.log(`App running in ${PORT}`);
	});
})
.catch(e=>{
	console.log('Error occurred')
})
console.log('server side scriopt started ----------------================')