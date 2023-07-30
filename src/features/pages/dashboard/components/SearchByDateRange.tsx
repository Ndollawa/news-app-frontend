import React from 'react'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import Modal from '../../../../components/Modal'
import useWindowSize from '../../../../app/utils/hooks/useWindowSize'

const SearchByDateRange = ({
  showDates,
  setShowDates,
  dates, 
  setDates,
  mArticles,
  setQuery,
  setArticles,
  searchData,
  searchDataByAuthor,
  searchDataBySource
}:any) => {
  const {width} = useWindowSize()

const clearDates =() => setDates( {
  startDate: null,
  endDate: null,
  key: "selection",
})
// console.log(dates[0])
  return (
    <Modal isVisible={showDates} onClose={()=>setShowDates(false)} size={'600px'}>
      <div>
        <div>
          <DateRangePicker
            onChange={(item:any) => setDates([item.selection])}
          //   showSelectionPreview={true}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            months={width! > 660 ? 2 : 1}
            ranges={dates}
            direction={width! > 660 ? "horizontal" : "vertical"}
          />
      </div>
    <div className="form-input">
      <button type='button' className='bg-black-400 text-white py-3 px-4' onClick={clearDates}>Clear Dates</button>
    </div>
</div>
</Modal>
  )
}

export default SearchByDateRange
