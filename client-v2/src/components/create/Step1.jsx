import '../../css/positions/step.css'
import vid from '../../assets/videos/step-1.mp4'

const Step1 = () => {
  return (
    <main className="create__main step">
      <div className="step__body">
        <label>Step 1</label>
        <h1>Tell us about your place</h1>
        <p>In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay.</p>
      </div>
      <video className='step__vid' autoPlay muted>
        <source src={vid} type="video/mp4" />
      </video>
    </main>
  )
}

export default Step1