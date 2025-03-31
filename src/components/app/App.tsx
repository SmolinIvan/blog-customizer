import { CSSProperties, useState } from 'react';

import { Article } from '../../components/article/Article';
import { ArticleParamsForm } from '../../components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from '../../constants/articleProps';

import styles from './App.module.scss';

export const App = () => {
	const [articleState, setArticleState] = useState<ArticleStateType>(defaultArticleState);

	function handleSetArticleSettings(newState: ArticleStateType) {
		setArticleState(newState);
	}

	function handleResetSettings() {
		setArticleState(defaultArticleState);
	}

	return (
		<main
			className={styles.main}
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
				applySetting={handleSetArticleSettings}
				resetSetting={handleResetSettings}
			/>
			<Article />
		</main>
	);
};
