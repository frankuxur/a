import '../../css/positions/step.css'
import vid from '../../assets/videos/step-3.mp4'

const Step3 = () => {
  return (
    <main className="create__main step">
        <div className="step__body">
            <label>Step 3</label>
            <h1>Finish up and publish</h1>
            <p>Finally, you’ll choose if you'd like to start with an experienced guest, then you'll set your nightly price. Answer a few quick questions and publish when you're ready.</p>
        </div>
        <video className='step__vid' autoPlay muted>
            <source src={vid} type="video/mp4" />
        </video>
    </main>
  )
}

export default Step3