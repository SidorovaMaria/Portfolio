import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Greeting from "../components/Greeting";
import { fetchMoodEntries } from "../redux/moodSlice";
import Average from "../components/Average";
import Trends from "../components/Trends";
import { fetchUser } from "../redux/authSlice";
import Loading from "../components/Loading";

const HomePage = () => {
	const { user, token } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	useEffect(() => {
		if (token && !user) {
			dispatch(fetchUser());
			console.log("Fetching user data...");
		}
	}, [dispatch, token, user]);

	useEffect(() => {
		if (user) {
			dispatch(fetchMoodEntries());
		}
	}, [dispatch, user]);
	if (!user) {
		return (
			<section className="flex flex-col items-center justify-center h-screen w-screen gap-10">
				<Loading />
				<h1 className="text-1 text-n-900">Fetching Your Data...</h1>
			</section>
		);
	}

	return (
		<div className="pb-20 flex flex-col gap-16 items-center justify-center">
			<section className="flex flex-col items-center justify-start gap-12 px-4 pt-8 md:px-8 md:pt-10 lg:max-w-[1170px] w-full">
				<Header />
				<Greeting />
			</section>
			{/* Average and Trend */}
			<section className="w-full flex flex-col px-4 md:px-8 gap-8 lg:flex-row lg:mx-auto lg:max-w-[1170px]">
				<Average />
				<Trends />
			</section>
		</div>
	);
};

export default HomePage;
