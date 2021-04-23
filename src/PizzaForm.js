import * as yup from 'yup';
import React, {useState} from 'react'
import axios from 'axios'
import PizzaCheckout from './Orders'

const initialOrderValues = {
name: '',
email: '',
phone:'',
additionalInfomation:'',
size:'',
base:'',
specialInstructions : '',

pomodorobase:false,
bbqsaucebase: false,
pestobase: false,
pineapples: false,
bananapeppers: false,
salami: false,
grillenchicken: false,
beef:false,
proscuitto:false,
mozarella: false,
basil: false,
arugula: false,
spinach:false,

}

const initialOrderErrors = {name: '',
email: '',
phone:'',
}

function PizzaForm(){
const formSchema = yup.object().shape({
    name: yup.string().required('Please enter your name').min(6, 'Name must be at least 6 characters long'),
    
    email: yup.string().required('Must be a valid email'),
    
    phone: yup.string().required('Must be a valid phone number'),
    
   
     size: yup.string().required('Pick a size'),
    
    specialInstructions: yup.string(),
    pomodorobase:yup.boolean(),
    bbqsaucebase:yup.boolean(),
    pestobase:yup.boolean(),
	pineapples:yup.boolean(),
    salami:yup.boolean(),
	grilledchicken:yup.boolean(),
	bananapeppers:yup.boolean(),
    beef:yup.boolean(),
    proscuitto:yup.boolean(),
    mozarella:yup.boolean(),
    basil:yup.boolean(),
    spinach:yup.boolean(),
    arugula:yup.boolean(),
    
    additionalInformation: yup.string(),
})

const [orderValues, setOrderValues]=useState(initialOrderValues)
const [orderErrors, setOrderErrors]=useState(initialOrderErrors)
const [newOrder, setNewOrder] = useState(initialOrderValues)

const postNewOrder = (newOrder) => {
    axios
    .post('https://reqres.in/api/user', newOrder)
    .then((res) => {
//console.log(res.data)
    setNewOrder(newOrder)
    })
    .catch((err) => {
      console.log(err);
    });
}
  const onSubmit = (e) => {
    e.preventDefault();
   postNewOrder(orderValues)
};
  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    const valueToUse = type === "checkbox" ? checked : value;
    inputChange(name, valueToUse);
}; 


const inputChange = (name, value) =>{
    yup.reach(formSchema, name)
        .validate(value)
        .then(() => {
    setOrderErrors({
            ...orderErrors,
            [name]: "",
})})
          .catch((err) => {
    setOrderErrors({
              ...orderErrors,
              [name]: err.errors[0],
})});
    setOrderValues({
        ...orderValues,
        [name]: value, 
});};


return (<form onSubmit={onSubmit}>
<div className = 'form'>
        <h3>Build Your Pizza</h3>
    <label>
         Name
    <input
        value={orderValues.name}
        onChange={onChange}
        name='name'
        type='text'/>
</label>
<label>
    Email 
        <input
            value={orderValues.email}
            onChange={onChange}
            name='email'
            type='email'/>
</label>
    <label>
        Phone Number 
    <input
        value={orderValues.phone}
        onChange={onChange}
        name='phone'
        type='text'/>
</label>

<label>
    <select
     name='size'
     value={orderValues.size}
     onChange={onChange}>
        <option>----Select a size----</option>
        <option value="xl">Extra Large</option> 
        <option value="lrg">Large</option>
        <option value="med">Medium</option>
        <option value="small">Small</option>
</select>
</label>
<label>
    <select
     name='base'
     value={orderValues.base}
     onChange={onChange}>
        <option>----Choose Base----</option>
        <option value="pomodorobase">Pomodoro/Homemade Tomato Sauce</option> 
        <option value="bbqsaucebase">BBQ Sauce</option>
        <option value="pestobase">Pesto Spread</option>
        
</select>
</label>

            <h2>Add Toppings</h2>
            <h4>(up to 5 toppings maximum</h4>

<div className="checks">
    <label> Pineapples
        <input
            type="checkbox"
            name="pineapples"
            checked={orderValues.pineapples}
            onChange={onChange}/>

</label>
    <label> Banana Peppers
        <input
            type="checkbox"
            name="bananapeppers"
            checked= {orderValues.bananapeppers}
            onChange={onChange} />

</label>
    <label> Mozarella
         <input
            type="checkbox"
            name="mozarella"
            checked={orderValues.mozarella}
            onChange={onChange} />

</label>
    <label> Salami
        <input
            type="checkbox"
            name="salami"
            checked={orderValues.salami}
            onChange={onChange}/>

</label>
    <label> Grilled Chicken
        <input
            type="checkbox"
            name="grilledchickem"
            checked={orderValues.grillenchicken}
            onChange={onChange}/>
</label>
    <label> Basil
        <input
            type="checkbox"
            name="basil"
            checked={orderValues.basil}
            onChange={onChange}/>
</label>
    <label> Spinach
        <input
            type="checkbox"
             name="spinach"
            checked={orderValues.spinach}
            onChange={onChange}/>
</label>
    <label> Proscuitto
        <input
          type="checkbox"
          name="proscuitto"
          checked={orderValues.proscuitto}
          onChange={onChange}/>
</label>
</div>

    <h2>Additional Information</h2>
         <textarea className='additionalinfomation'
            name="textarea"
            value={orderValues.textarea}
            onChange={onChange}
            placeholder=" Utensils? extra Sauce? Special request?" rows ="6" cols="60"/>
<div className="add-to">

    <button id="submit-btn" onClick={(evt)=> evt.preventDefault}>Place to order</button>
</div>
     <PizzaCheckout newOrder={newOrder} />
</div>
</form>
)}

export default PizzaForm 