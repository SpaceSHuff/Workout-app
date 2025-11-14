import { useState, useRef } from 'react'
import { Camera, X, Upload, Loader, AlertCircle } from 'lucide-react'

function PhotoNutrition({ onAnalysisComplete, onClose }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [useCamera, setUseCamera] = useState(false)
  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setUseCamera(true)
    } catch (err) {
      console.error("Error accessing camera:", err)
      alert("Unable to access camera. Please check permissions.")
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0)
      const imageData = canvas.toDataURL('image/jpeg')
      setSelectedImage(imageData)
      stopCamera()
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setUseCamera(false)
  }

  const analyzeImage = async () => {
    if (!selectedImage) return

    setIsAnalyzing(true)

    // Simulate AI analysis with realistic delay
    // In production, you would call an AI API here (e.g., Clarifai, Google Vision, Nutritionix)
    setTimeout(() => {
      // For demo purposes, provide estimated nutrition
      // In production, this would come from an AI food recognition API
      const estimatedFood = {
        name: "Food Item (Estimated from Photo)",
        calories: 350,
        protein: 20,
        carbs: 35,
        fats: 15,
        serving: "1 portion (estimated)",
        category: "photo",
        source: "photo-ai",
        confidence: 75,
        note: "This is an AI estimate. Please adjust servings for accuracy."
      }

      setIsAnalyzing(false)
      onAnalysisComplete(estimatedFood)
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">Photo Nutrition Analysis</h3>
            <button
              onClick={() => {
                stopCamera()
                onClose()
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* AI Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">AI-Powered Feature</p>
              <p>This feature uses AI to estimate nutritional content from photos. Results are estimates and may vary. For best accuracy, use barcode scanning or manual entry.</p>
            </div>
          </div>

          {!selectedImage && !useCamera && (
            <div className="space-y-4">
              {/* Camera Option */}
              <button
                onClick={startCamera}
                className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-indigo-400 hover:bg-indigo-50 transition-all"
              >
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-700 font-semibold">Take Photo</p>
                <p className="text-sm text-gray-500 mt-1">Use your camera</p>
              </button>

              {/* Upload Option */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-indigo-400 hover:bg-indigo-50 transition-all"
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-700 font-semibold">Upload Photo</p>
                <p className="text-sm text-gray-500 mt-1">Choose from gallery</p>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          )}

          {/* Camera View */}
          {useCamera && (
            <div className="space-y-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg"
              />
              <div className="flex gap-3">
                <button
                  onClick={capturePhoto}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
                >
                  Capture Photo
                </button>
                <button
                  onClick={stopCamera}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Preview and Analyze */}
          {selectedImage && (
            <div className="space-y-4">
              <img
                src={selectedImage}
                alt="Selected food"
                className="w-full rounded-lg"
              />

              {isAnalyzing ? (
                <div className="text-center py-8">
                  <Loader className="w-12 h-12 text-indigo-600 mx-auto mb-4 animate-spin" />
                  <p className="text-gray-600 font-semibold">Analyzing nutrition...</p>
                  <p className="text-sm text-gray-500 mt-2">Using AI to identify food and estimate nutrition</p>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={analyzeImage}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
                  >
                    Analyze Nutrition
                  </button>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50"
                  >
                    Retake
                  </button>
                </div>
              )}
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* How it works */}
        {!selectedImage && !useCamera && (
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-3">How it works:</h4>
            <ol className="text-sm text-gray-600 space-y-2">
              <li>1. Take a photo or upload an image of your food</li>
              <li>2. AI analyzes the image to identify the food items</li>
              <li>3. Nutritional estimates are provided based on typical serving sizes</li>
              <li>4. Review and adjust the serving size if needed</li>
              <li>5. Add to your food diary</li>
            </ol>
            <p className="text-xs text-gray-500 mt-4">
              Note: This is a demo feature. In production, this would connect to an AI service like Nutritionix, Clarifai, or Google Cloud Vision for accurate food recognition.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PhotoNutrition
