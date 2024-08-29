'use client'

import ProfileTabs from "./components/ProfileTabs"
import { useDispatch, useSelector } from "react-redux"
import moment from 'moment-timezone';
import { momentLocalizer } from 'react-big-calendar'
import AppointmentsWidget from "./components/AppointmentsWidget";
import EditEventModal from "../calendar/_components/EditEventModal";
import EditAppointmentModal from "./components/EditAppointmentModal";
import { toggleSettingsButton, toggleSelectedTab } from "../../lib/features/profile/profileSlice";
import { useEffect } from "react";
import EditProfileForm from "./components/EditProfileForm";
import SettingsComponent from "./components/SettingsComponent";


const ProfilePage = () => {
    const { selectedTab, settingsButtonPressed, timezone } = useSelector((state) => state.profile)
    moment.tz.setDefault(timezone)
    const localizer = momentLocalizer(moment)
    const dispatch = useDispatch()

    /* Loophole to redux refreshing state on page load 
    Allows for illusion of redirecting and then setting state*/
    useEffect(() => {
        const selectedTab = localStorage.getItem('selectedTab');
        if (selectedTab !== null) {
            dispatch(toggleSelectedTab(parseInt(selectedTab)));
        }
    }, [dispatch]);

    return (
        <>
            <div className="flex justify-around">
                <EditEventModal />
            </div>

            <div className="">

                <ProfileTabs />

                <section className={`${selectedTab == 0 ? '' : 'hidden'}`}>

                    <div className="flex justify-around mx-auto sm:w-[80%] max-h-[80vh] text-center bg-white rounded-2xl p-6 m-6">

                        <div className="w-full">
                            <AppointmentsWidget localizer={localizer} />
                        </div>


                    </div>
                </section>
                <section className={`${selectedTab == 1 ? '' : 'hidden'} `}>
                    Goodbye
                </section>
                <section className={`${selectedTab == 2 ? '' : 'hidden'} flex w-full`}>
                    <SettingsComponent />
                </section>
                <section className={`${selectedTab == 3 ? '' : 'hidden'} flex w-full`}>
                    <EditProfileForm />
                </section>

            </div>
        </>
    )
}

export default ProfilePage