import styled from 'styled-components'

const OuterBar = styled.div`
  height: 20px;
  width: 300px;
  background-color: #E8CFCF;

  margin: 0 10px;
  
  display: flex;
  flex-direction: row-reverse;
  border-radius: 25px;`

const InnerBar = styled.div`
  height: ${props => props.percentCalc}px;
  width: 20px;
  background-color: ${props => props.color};
  border-radius: 25px;`

const QuotaBar = (props) => {
  const maxHeight = 300;
  const percentCalc = maxHeight / 100 * props.percent;


  return (
    <OuterBar percentCalc={percentCalc}>
      <InnerBar percentCalc={percentCalc}>
      </InnerBar>
    </OuterBar>
  )
}

export default QuotaBar
