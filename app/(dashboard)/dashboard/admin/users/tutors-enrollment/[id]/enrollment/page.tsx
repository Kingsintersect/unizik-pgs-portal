import React from "react";
import TutorEnrollmentTabs from "../../component/TutorsEnrollmentTabs";
import TutorCourseEnrollmentList from "../../component/TutorCurseEnrollmentList";

const EnrollmentPage = ({ params }: { params: { id: string } }) => {
	const id = params.id;
	return (
		<div className="py-10 space-y-7 ">
            <TutorCourseEnrollmentList tutorId={id} />
			<TutorEnrollmentTabs userId={id} />
		</div>
	);
};

export default EnrollmentPage;
