import CategoryAnalysis from "./CategoryAnalysis"
import CustomerAnalysis from "./CustomerAnalysis"
import DateAnalysis from "./DateAnalysis"
import ProductAnalysis from "./ProductAnalysis"
import SalesAnalysis from "./SalesAnalysis."
import StockAnalysis from "./StockAnalysis"
import YearlyAnalysis from "./YearlyAnalysis"
function Analysis () {
  return (
    <div>
      <div className="text-5xl font-bold bg-blue-500 w-[100%] h-[50px] z-100">ANALYSIS</div>
      <CustomerAnalysis/>
      <StockAnalysis/>
      <DateAnalysis/>
      <YearlyAnalysis/>
      <ProductAnalysis/>
      <SalesAnalysis/>
      <CategoryAnalysis/>
      
    </div>
  )
}

export default Analysis
