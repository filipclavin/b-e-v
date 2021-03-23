
import useFetch from './Fetch/useFetch';
import Loading from './Loading/Loading'

const KEY = 'cd9fc14d6c8d2b4dff0208735385410f'

const TOKEN = 'de2cc82232b0b3c1e867b5b21deb88eacb4522851ff0b3e6535db384fe0ed3f8'

const Trello = () => {

    
    const { data: data, isLoading, error } = useFetch(`https://api.trello.com/1/members/me/boards?key=${KEY}&token=${TOKEN}`);
    const board = useFetch(`https://api.trello.com/1/boards/603cc2d706938e4522a2db36?key=${KEY}&token=${TOKEN}`); 
   /*  const board = useFetch(`https://api.trello.com/1/boards/603cc2d706938e4522a2db36?key=cd9fc14d6c8d2b4dff0208735385410f&token=de2cc82232b0b3c1e867b5b21deb88eacb4522851ff0b3e6535db384fe0ed3f8`);  */

    console.log(board)


    /* const getBoard = () => {
        fetch(`https://api.trello.com/1/boards/603cc2d706938e4522a2db36?key=${KEY}&token=${TOKEN}`)
          .then(res => {
            return res.json()
          })
          .then(json => {
            setBoard(json)
          })
      } */
    
      /* useFetch(`https://api.trello.com/1/boards/603cc2d706938e4522a2db36?key=${KEY}&token=${TOKEN}`) */
    
    
    

    return ( 
        <div className="trello">
            <h1>Början på API trello </h1>
            { error && <div>{error}</div>}
            {isLoading && <div><Loading/></div>}
             {data && data.map(item => <div data={data} key={data.id}>
                 <span>{data[0].name}</span>  
             </div>)}

        </div>
     );
}
 
export default Trello;

    