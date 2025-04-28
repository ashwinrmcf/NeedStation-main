const HowItWorks = () => {
    return (
      <section className="text-white py-12 px-4 sm:px-8 lg:px-16">
        <h2 className="text-center text-4xl font-semibold mb-10">How it works</h2>
        
        {/* Container for all steps, aligns items horizontally on larger screens */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12" style={{ marginLeft: "5vw" }}>
          
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:w-1/3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center bg-cyan-400 text-black rounded-full w-10 h-10 text-lg font-bold">
                1
              </div>
              <h3 className="text-3xl font-semibold text-cyan-400">Describe Your Task</h3>
            </div>
            <p className="text-gray-300 mt-2 max-w-xs font-medium">
              Tell us what you need done, when and where it works for you.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:w-1/3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center bg-cyan-400 text-black rounded-full w-10 h-10 text-lg font-bold">
                2
              </div>
              <h3 className="text-3xl font-semibold text-cyan-400">Choose Your Tasker</h3>
            </div>
            <p className="text-gray-300 mt-2 max-w-xs font-medium">
              Browse trusted Taskers by skills, reviews, and price. Chat with them to confirm details.
            </p>
          </div>
  
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:w-1/3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center bg-cyan-400 text-black rounded-full w-10 h-10 text-lg font-bold">
                3
              </div>
              <h3 className="text-3xl font-semibold text-cyan-400">Get it Done!</h3>
            </div>
            <p className="text-gray-300 mt-2 max-w-xs font-medium">
              Your Tasker arrives and gets the job done. Pay securely and leave a review.
            </p>
          </div>
        </div>
      </section>
    );
  };
  
  export default HowItWorks;