"use clinet";

import React from "react";
import TutorEnrollment from "../../component/TabsSytem";

const EnrollmentPage = ({ params }: { params: { id: string } }) => {
	const id = params.id;
	return (
		<div className="py-20 space-y-7">
			<div className="flex flex-col max-w-[800px] mx-auto text-right ">
				<h1 className="text-orange-600 text-4xl font-bold">Enroll To Course</h1>
				<div className="text-gray-700 text-lg">Choose option complete your enrollment</div>
					<hr className="mt-5" />
			</div>
			<TutorEnrollment userId={id} />
		</div>
	);
};

export default EnrollmentPage;
