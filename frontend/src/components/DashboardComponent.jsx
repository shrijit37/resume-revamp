import React from 'react'

const DashboardComponent = () => {
    return (
        <div className="flex flex-col items-center p-3">
            <div className="w-7/8 flex justify-around p-10 border-3 shadow-lg shadow-amber-800 m-3 rounded-xl border-green-800">
                <div className="">
                    <div className="text-2xl text-center m-2">10</div>
                    <div className="text-xl">Job applied</div>
                </div>
                <div className="">
                    <div className="text-2xl text-center m-2">10</div>
                    <div className="text-xl">Resume Generated</div>
                </div>
                <div className="">
                    <div className="text-2xl text-center m-2">10</div>
                    <div className="text-xl">Resume Report Generated</div>
                </div>
            </div>
            <div className="text-center text-4xl m-8">Skills</div>
            <div className="w-full flex">
                <div className="w-1/2">

                    <div className="overflow-x-auto ">
                        <div className="tabs-lift tabs min-w-max">
                            <input type="radio" name="my_tabs_7" className="tab z-1" aria-label="Tab title 1" />
                            <div className="sticky start-0 tab-content  border-base-300 bg-base-100 p-6">Tab content 1</div>
                            <input type="radio" name="my_tabs_7" className="tab z-1" aria-label="Tab title 2" defaultChecked />
                            <div className="sticky start-0 tab-content  border-base-300 bg-base-100 p-6">Tab content 2</div>
                            <input type="radio" name="my_tabs_7" className="tab z-1" aria-label="Tab title 3" />
                            <div className="sticky start-0 tab-content border-base-300 bg-base-100 p-6">Tab content 3</div>
                            <input type="radio" name="my_tabs_7" className="tab z-1" aria-label="Tab title 4" />
                            <div className="sticky start-0 tab-content border-base-300  p-6">Tab content 4</div>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 bg-white">sadf</div>
            </div>
        </div>
    )
}

export default DashboardComponent