// Each step we rerender the password generator 
// use hooks useCallback(function , dependencies) to rerender the password 
// inside the dependencies we have the array and something
import { useState,useCallback,useEffect,useRef} from 'react'

import './App.css'

function App() {
  // always set the default value to show the things 
  // maintain the checkbox to solve the problem
  
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [char, setChar] = useState(false)
  // where password is store 
  
  const[password,setPassword] = useState("")
  // we try to generate the password here

  // another hooks useRef 
  // always store in a variable 
  const passref = useRef(null)

  //copy method is calling 
  //jayada logo se baat krna hai to useCallback use kro
  const copyPasswordToClick =useCallback( ()=>{
    passref.current?.select()
    window.navigator.clipboard.writeText(pasword)
  },[password])

  // method to generate the random password 
  //structure = useCallback(function , dependencies)
  // function means = arrow function(()=>{})
  //dependencies => array 
  const passgen = useCallback(()=>{
    let pass  = "";
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" ;
    if(number)str += "0123456789" ;
    if(char)  str+="~`!@#$%^&*()_-+={[}]|\:;"

    // on the bases of length we try to run loops
    for(let i = 1 ;i<= length ;i++)
    {
      // random generate the word 
      let element  = Math.floor(Math.random() * str.length +1)
      pass += str.charAt(element) ;
    }
    setPassword(pass);

  },[length,number,char,setPassword])
  // passgen(pass);
  // dont call directly to the function 
  // soo resolve the problem use setEffect hooks 
  useEffect(()=>{
    passgen()
  },[length,number,char,setPassword])
  return (
    <>
      {/*basic div to write the value here 
       */}
       <div className='w-full max-w-md mx-auto shadow-md
       rounded-lg px-4 py-3 my-8 text-orange-400 bg-gray-800'>
        <h1 className='text-white text-center py-0'>
            Password generator
        </h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          {/* passreference in every input use ref */}
          <input type="text"
            value={password}
            className = 'outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref ={passref}
          />
          {/* here copy button is there but not working */}
          <button 
          onClick={copyPasswordToClick}
          className='outline-none bg-blue-700 text-white
          px-3 py-.5 shrink-0'
          // function call for copy button 
          >copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" 
            min = {6} 
            max={100}
            value ={length}
            className='cursor-pointer'
            onChange={ (e)=>{setLength(e.target.value)}}
            />
            <label> Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
            defaultChecked ={number}
            id ="numberInput"
            onChange={ ()=>{setNumber((prev)=> !prev)}}
            />
            <label htmlFor='number'> Numbers</label>
          </div>
          
          <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
            defaultChecked ={char}
            id ="charInput"
            onChange={ ()=>{setChar((prev)=> !prev)}}
            />
            <label htmlFor='Char'> Characters</label>
          </div>
        </div>
       </div>
    </>
  )
}

export default App
