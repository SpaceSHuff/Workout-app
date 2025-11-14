import { useState, useEffect, useRef } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { Camera, X, Loader } from 'lucide-react'

function BarcodeScanner({ onScanSuccess, onClose }) {
  const [isScanning, setIsScanning] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const scannerRef = useRef(null)
  const html5QrCodeRef = useRef(null)

  useEffect(() => {
    return () => {
      stopScanning()
    }
  }, [])

  const startScanning = async () => {
    try {
      setError(null)
      setIsLoading(true)

      const html5QrCode = new Html5Qrcode("barcode-scanner")
      html5QrCodeRef.current = html5QrCode

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 150 },
          aspectRatio: 1.7777778
        },
        async (decodedText) => {
          // Barcode successfully scanned
          await stopScanning()
          await fetchProductInfo(decodedText)
        },
        (errorMessage) => {
          // Parse error, ignore
        }
      )

      setIsScanning(true)
      setIsLoading(false)
    } catch (err) {
      setError("Unable to access camera. Please ensure camera permissions are granted.")
      setIsLoading(false)
      console.error("Error starting scanner:", err)
    }
  }

  const stopScanning = async () => {
    if (html5QrCodeRef.current && isScanning) {
      try {
        await html5QrCodeRef.current.stop()
        html5QrCodeRef.current = null
      } catch (err) {
        console.error("Error stopping scanner:", err)
      }
    }
    setIsScanning(false)
  }

  const fetchProductInfo = async (barcode) => {
    setIsLoading(true)
    try {
      // Fetch from Open Food Facts API
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
      const data = await response.json()

      if (data.status === 1 && data.product) {
        const product = data.product

        // Extract nutritional information per 100g
        const nutrients = product.nutriments || {}
        const servingSize = parseFloat(product.serving_size) || 100

        const foodData = {
          name: product.product_name || "Unknown Product",
          barcode: barcode,
          calories: Math.round(nutrients['energy-kcal_100g'] || nutrients['energy-kcal'] || 0),
          protein: Math.round(nutrients['proteins_100g'] || nutrients.proteins || 0),
          carbs: Math.round(nutrients['carbohydrates_100g'] || nutrients.carbohydrates || 0),
          fats: Math.round(nutrients['fat_100g'] || nutrients.fat || 0),
          serving: product.serving_size || "100g",
          category: "scanned",
          source: "barcode"
        }

        onScanSuccess(foodData)
      } else {
        setError("Product not found in database. Please add manually.")
        setTimeout(() => {
          onClose()
        }, 2000)
      }
    } catch (err) {
      setError("Error fetching product information. Please try again.")
      console.error("Error fetching product:", err)
    }
    setIsLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">Scan Barcode</h3>
            <button
              onClick={async () => {
                await stopScanning()
                onClose()
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Scanner Area */}
        <div className="p-6">
          {!isScanning && !isLoading && (
            <div className="text-center py-12">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-6">
                Position the barcode within the camera frame
              </p>
              <button
                onClick={startScanning}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
              >
                Start Camera
              </button>
            </div>
          )}

          {isLoading && (
            <div className="text-center py-12">
              <Loader className="w-16 h-16 text-indigo-600 mx-auto mb-4 animate-spin" />
              <p className="text-gray-600">
                {isScanning ? "Looking up product..." : "Starting camera..."}
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Scanner Container */}
          <div id="barcode-scanner" className={isScanning ? '' : 'hidden'}></div>

          {isScanning && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 mb-4">
                Align the barcode within the frame
              </p>
              <button
                onClick={async () => {
                  await stopScanning()
                  onClose()
                }}
                className="text-gray-600 hover:text-gray-800 font-semibold"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Instructions */}
        {!isScanning && !isLoading && (
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-2">Tips for scanning:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Make sure the barcode is well-lit</li>
              <li>• Hold your device steady</li>
              <li>• Keep the barcode centered in the frame</li>
              <li>• Try different distances if it doesn't scan</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default BarcodeScanner
