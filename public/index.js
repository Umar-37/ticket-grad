let log = console.log;
let db = firebase.firestore();


db.collection('user').doc('*').get().then(snapshot => {
  //get specific document
  console.log(snapshot.data())
})

class square {
  constructor(width) {
    this.height = width;
    this.width = width;
  }
  static equ(a, b) {
    return this;
  }
  insideSquare(){
    return 99;
  }

}
class omar extends square{
  constructor(width,name,age){
    super(width)
    this.name=name;
    this.age=age;
    super.insideSquare() *2
  }

  fun(){
    return this.insideSquare();
  }
}

let sq1 = new square(4)
let sq2 = new square(2)
let om1 = new omar(24,"omar",24)
log(om1.)