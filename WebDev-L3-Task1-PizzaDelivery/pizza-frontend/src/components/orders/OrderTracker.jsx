import React from 'react'

const steps = [
  "Order Received",
  "Preparing",
  "Out for Delivery",
  "Delivered",
];

function OrderTracker({ status }) {
  const currentStep = steps.indexOf(status);

  return (
    <div className="mt-6">

      {steps.map((step, index) => (

        <div
          key={step}
          className="flex items-start gap-4"
        >

          <div className="flex flex-col items-center">

            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold
              ${index < currentStep
                  ? "bg-green-600"
                  : index === currentStep
                    ? "bg-yellow-500"
                    : "bg-gray-300"
                }`}
            >
              {index < currentStep ? "✓" : index + 1}
            </div>

            {index !== steps.length - 1 && (
              <div
                className={`w-1 h-12 ${index < currentStep
                    ? "bg-green-600"
                    : "bg-gray-300"
                  }`}
              />
            )}

          </div>

          <div className="pt-1">

            <h3 className="font-semibold">
              {step}
            </h3>

          </div>

        </div>

      ))}

    </div>
  );
}

export default OrderTracker;