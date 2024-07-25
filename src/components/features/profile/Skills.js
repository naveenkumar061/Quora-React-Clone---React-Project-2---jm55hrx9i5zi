import { format } from 'date-fns';
import { FaBriefcase, FaCalendar, FaGraduationCap } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

function Skills({ workExperience, education, address, createdAt }) {
  return (
    <>
      {workExperience?.[0] && (
        <div className="flex gap-2 items-center px-2">
          <div className="rounded-full p-2 bg-[#f1f2f2] dark:bg-transparent text-[#636466] dark:text-[#b1b3b6]">
            <FaBriefcase size={14} />
          </div>
          <p>
            <span>
              {workExperience[0].designation} at {workExperience[0].companyName}{' '}
            </span>
            <span className="text-[#939598]">
              {workExperience[0].startDate &&
                format(new Date(workExperience[0].startDate), 'yyyy')}{' '}
              -{' '}
              {workExperience[0].endDate
                ? format(new Date(workExperience[0].endDate), 'yyyy')
                : 'Present'}
            </span>
          </p>
        </div>
      )}
      {education.length > 0 && (
        <div className="flex gap-2 items-center px-2">
          <div className="rounded-full p-2 bg-[#f1f2f2] dark:bg-transparent text-[#636466] dark:text-[#b1b3b6]">
            <FaGraduationCap size={14} />
          </div>
          <p>
            <span>{education[0].degree}</span>{' '}
            <span className="text-[#939598]">
              {education[0].startDate &&
                format(new Date(education[0].startDate), 'yyyy')}{' '}
              -{' '}
              {education[0].endDate &&
                format(new Date(education[0].endDate), 'yyyy')}
            </span>{' '}
          </p>
        </div>
      )}
      {address.length > 0 && (
        <div className="flex gap-2 items-center px-2">
          <div className="rounded-full p-2 bg-[#f1f2f2] dark:bg-transparent text-[#636466] dark:text-[#b1b3b6]">
            <FaLocationDot size={14} />
          </div>
          <div>
            Lives in {address[0].city}, {address[0].state}, {address[0].country}
          </div>
        </div>
      )}
      <div className="flex gap-2 items-center px-2">
        <div className="rounded-full p-2 bg-[#f1f2f2] dark:bg-transparent text-[#636466] dark:text-[#b1b3b6]">
          <FaCalendar size={14} />
        </div>
        <div>Joined {format(createdAt, 'MMMM yyyy')}</div>
      </div>
    </>
  );
}

export default Skills;
