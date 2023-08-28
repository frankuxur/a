import '../../css/positions/step.css'
import vid from '../../assets/videos/step-2.mp4'

const Step2 = () => {
  return (
    <main className="create__main step">
        <div className="step__body">
          <label>Step 2</label>
          <h1>Make your place stand out</h1>
          <p>In this step, you’ll add some of the amenities your place offers, plus 5 or more photos. Then you’ll create a title and description.</p>
        </div>
        <video className='step__vid' autoPlay muted>
          <source src={vid} type="video/mp4" />
        </video>
    </main>
  )
}

export default Step2