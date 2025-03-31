import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useEffect, useRef, useState } from 'react';
import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import clsx from 'clsx';

type ArticleSelectOptions = {
	fontFamilies: OptionType[];
	fontSizes: OptionType[];
	fontColors: OptionType[];
	backgroundColors: OptionType[];
	contentWidths: OptionType[];
};

type ArticleParamsProps = {
	options: ArticleSelectOptions;
	applySetting: (state: ArticleStateType) => void;
	resetSetting: () => void;
};

export const ArticleParamsForm = (props: ArticleParamsProps) => {
	const [isMenuOpened, setIsMenuOpened] = useState(false);

	const [formSettings, setFormSettings] = useState(defaultArticleState);

	const settingsAside = useRef<HTMLElement | null>(null);

	function toggleOpen() {
		setIsMenuOpened(!isMenuOpened);
	}

	function handleClickOutside(event: MouseEvent) {
		if (
			settingsAside.current?.classList.contains(styles.container_open) &&
			!settingsAside.current.contains(event.target as Node)
		) {
			toggleOpen();
		}
	}

	function handleSelectSetting(selected: OptionType, key: string) {
		setFormSettings((previousState) => ({
			...previousState,
			[key]: selected,
		}));
	}

	function handleReset() {
		props.resetSetting()
		setFormSettings(defaultArticleState);

	}

	function handleApply() {
		props.applySetting(formSettings);
	}

	useEffect(() => {
		if (!isMenuOpened) return;
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpened]);

	return (
		<>
			<ArrowButton isOpen={isMenuOpened} onClick={toggleOpen} />
			<aside
				className={clsx(
					styles.container,
					isMenuOpened ? styles.container_open : ''
				)}
				ref={settingsAside}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						handleApply();
					}}>
					<Text
						children={'задайте параметры'}
						size={31}
						uppercase={true}
						weight={800}></Text>
					<Select
						title='шрифт'
						selected={formSettings.fontFamilyOption}
						options={props.options.fontFamilies}
						onChange={(value) =>
							handleSelectSetting(value, 'fontFamilyOption')
						}></Select>
					<RadioGroup
						selected={formSettings.fontSizeOption}
						options={props.options.fontSizes}
						onChange={(value) => handleSelectSetting(value, 'fontSizeOption')}
						name='radio-box'
						title='размер шрифта'></RadioGroup>
					<Select
						title='цвет шрифта'
						selected={formSettings.fontColor}
						options={props.options.fontColors}
						onChange={(value) =>
							handleSelectSetting(value, 'fontColor')
						}></Select>
					<Separator></Separator>
					<Select
						title='цвет фона'
						selected={formSettings.backgroundColor}
						options={props.options.backgroundColors}
						onChange={(value) =>
							handleSelectSetting(value, 'backgroundColor')
						}></Select>
					<Select
						selected={formSettings.contentWidth}
						options={props.options.contentWidths}
						onChange={(value) =>
							handleSelectSetting(value, 'contentWidth')
						}></Select>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
