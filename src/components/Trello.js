
import useFetch from './Fetch/useFetch';
import Loading from './Loading/Loading'

import { KEY, TOKEN } from "../constants"

const Trello = () => {

    
    const { data: data, isLoading, error } = useFetch(`https://api.trello.com/1/members/me/boards?key=${KEY}&token=${TOKEN}`);
    const board = useFetch(`https://api.trello.com/1/boards/603cc2d706938e4522a2db36?key=${KEY}&token=${TOKEN}`); 
  

    console.log(board)
    

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

    