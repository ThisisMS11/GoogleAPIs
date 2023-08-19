import CardSkelton from '../../components/skeltons/Card'
const loading = () => {
  const numberOfTimes = 8;

  const skeltons = Array.from({ length: numberOfTimes }, (_, index) => (
    <CardSkelton key={index} />
  ));

  return (
    <div className='flex flex-wrap relative justify-around'>
      {skeltons}
    </div>
  )
}

export default loading