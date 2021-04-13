import styled from 'styled-components'



const QuotaBar = (props) => {
  const maxHeight = 300;
  const percentCalc = maxHeight / 100 * props.percent;

    const OuterBar = styled.div`
  height: 300px;
  width: 20px;
  background-color: #E8CFCF;

  margin: 0 10px;
  
  display: flex;
  flex-direction: column-reverse;
  border-radius: 25px;`

    const InnerBar = styled.div`
  height: ${props => props.percentCalc}px;
  width: 20px;
  background-color: ${props => props.color};
  border-radius: 25px;`

  return (
    <OuterBar percentCalc={percentCalc}>
      <InnerBar percentCalc={percentCalc}>
      </InnerBar>
    </OuterBar>
  )
}

export default QuotaBar
