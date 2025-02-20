import { useEffect, useState } from 'react';
import './styles/App.css';

function App() {
  const [name, setName] = useState('');
  const [data, setData] = useState([]);

  const onInsertName = (eventName) => {
    setName(eventName);
  };

  useEffect(() => {
    fetchDragonBallCharacters();
  }, [name]);

  const url = "https://dragonball-api.com/api/characters";

  async function fetchDragonBallCharacters() {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      setData(result.items); // Asegúrate de que la API devuelve un array en `result.items`
      console.log("Personajes de Dragon Ball:", result);
    } catch (error) {
      console.error("Hubo un problema con la solicitud fetch:", error);
    }
  }

  return (
    <>
      <div>
        <div>
          <p>Hola, esto es lo que estás escribiendo: {name}</p>
        </div>
        <input
          type="text"
          placeholder="Escribe tu Nombre"
          onChange={(e) => onInsertName(e.target.value)}
        />
      </div>
      <div>
      <ul>
        {data.map((item, index) => (
        
            <li key={index} >
           
              <div className="card" style={{width: '18 rem'}}>
                <img src={item.image} className="card-img-top" alt={item.name} />
                    <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  
                </div>
              </div>

            </li>
              
         
          
        ))}
         </ul>
      </div>
    </>
  );
}

export default App;