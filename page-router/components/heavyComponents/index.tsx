import { useEffect, useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import ImgHigh from "@/assets/pemandangan.jpeg";

// Fungsi perhitungan berat (Fibonacci)
function expensiveCalculation(n: number): number {
  if (n <= 1) return n;
  return expensiveCalculation(n - 1) + expensiveCalculation(n - 2);
}

export default function HeavyComponent() {
  const [data, setData] = useState<number[]>([]);

  // Menggunakan useMemo untuk menghitung hanya saat komponen pertama kali dipasang
  const calculatedData = useMemo(
    () => Array.from({ length: 20 }, (_, i) => expensiveCalculation(i)),
    []
  );

  useEffect(() => {
    setData(calculatedData);
  }, [calculatedData]);

  return (
    <div>
      <h2>🔥 Heavy Component Rendered!</h2>

      {/* Grafik Berat */}
      <Line
        data={{
          labels: data.map((_, i) => `Step ${i}`),
          datasets: [
            {
              label: "Fibonacci",
              data,
              borderColor: "red",
            },
          ],
        }}
      />

      <img {...ImgHigh} alt="imgHigh" />
    </div>
  );
}
