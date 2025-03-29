import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [options, setOptions] = useState(defaultArticleState);

	const [articleState, setArticleState] = useState(defaultArticleState);

	function handleSelectSetting(selected: OptionType, key: string) {
		setOptions((previousState) => ({
			...previousState,
			[key]: selected,
		}));
		console.log(selected);
		console.log(options);
	}

	function handleSetArticleState() {
		setArticleState(options);
	}

	function handleResetSettings() {
		console.log('kek');
		setOptions(defaultArticleState);
		setArticleState(defaultArticleState);
	}

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				options={{
					fontFamilies: fontFamilyOptions,
					fontSizes: fontSizeOptions,
					fontColors: fontColors,
					backgroundColors: backgroundColors,
					contentWidths: contentWidthArr,
				}}
				selected={{
					fontFamily: options.fontFamilyOption,
					fontSize: options.fontSizeOption,
					color: options.fontColor,
					backgroundColor: options.backgroundColor,
					contentWidth: options.contentWidth,
				}}
				changeSetting={handleSelectSetting}
				resetSetting={handleResetSettings}
				applySettings={handleSetArticleState}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
