import React,{ useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [login, setLogin] = useState("");
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    setInterval(() => {
      axios({
        url: "https://api.uenify.com/getMessages"
      }).then(res => {
        setMessages(res.data.messages);
      });
    }, 500);
  }, []);
  const send = () => {
    if (!messages || !login) {
      return alert("Empty fields");
    }
    axios({
      url: "https://api.uenify.com/sendMessage",
      data: {
        login,
        message: text
      },
      method: "POST"
    }).then(res => {
      if (res.data && res.data.success) {
        setLogged(true);
        setText("");
      }
    });
  };
  return (
    <div className="App">
      {logged ? <span className="logged"> Logged as {login}</span> : null}
      {messages.map((el, i) => (
        <div key={i} className="message">
          <b>{el.login}</b>: {el.message}
          </div>
      ))}
      <form
      onSubmit={e => {
        e.preventDefault();
        send();
      }}
  >
    {!logged ? (
      <input
        placeholder="Login"
        onChange={e => {
          setLogin(e.target.value);
        }}
        type="text"
        value={login}
      />
    ) : null}
    <input
      placeholder="Message"
      onChange={e => {
        setText(e.target.value);
      }}
      type="text"
      value={text}
   />
   <button>Send</button>
 </form>
</div>
  );
    }
    
