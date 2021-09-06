import React from 'react'
import s from './Autocomplete.module.css'

const arr = ["autocomplete off", "autocompletetextview", "autocomplete off not working", "autocomplete js", "autocomplete react", "autocomplete chrome", "autocomplete vim", "autocomplete textview android", "autocomplete=newpassword", "autocomplete textview android", "autocomplete=newpassword", "autocomplete textview android",
    "autocomplete textview android", "autocomplete=newpassword", "test autocomplete"];

const Autocomplete = () => {
    const [state, setState] = React.useState('');
    const [show, setShow] = React.useState(false);
    const myRef = React.useRef();
    const inputOnChange = (e) => {
        setState(e.currentTarget.value)
        setShow(true)
    }
    const handleClickOutside = e => {
        if (!myRef.current.contains(e.target)) {
            setShow(false);
        }
    };
    const onClick = (item) => {
        setState(item)
        setShow(false)
    }
    function helper(arr, filter) {
        filter = filter.toLowerCase()
        let flagsYouWant = 'gi'
let regExp = new RegExp(`^${filter}`,flagsYouWant)
        return arr.filter(item =>regExp.test(item))
        .slice(0, 15)
        .map((item, i) => <div className={s.result} key={i} onClick={() => onClick(item)}
            dangerouslySetInnerHTML={{
                __html: item.replace(filter, `<span style="font-weight:400" >${filter}</span>`)
            }}></div>)
    }
    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    });
    return (
        <div className={s.wrapper} ref={myRef}>
            <div className={s.form}>
                <input type="text" list="list" value={state} onChange={inputOnChange} />
                <button onClick={() => alert(state)}>Search</button>
            </div>
            {show && <div className={s.list}>
                <div onClick={() => setShow(true)}>{state.toLocaleLowerCase()}</div>
                {helper(arr, state)}
            </div>}
        </div>
    )
}

export default Autocomplete

