import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useEffect, useRef, useState } from 'react';
import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import { OptionType } from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

type ArticleSelectOptions = {
	fontFamilies: OptionType[];
	fontSizes: OptionType[];
	fontColors: OptionType[];
	backgroundColors: OptionType[];
	contentWidths: OptionType[];
};

type ArticleSelectedOptions = {
	fontFamily: OptionType;
	fontSize: OptionType;
	color: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
};

type ArticleParamsProps = {
	options: ArticleSelectOptions;
	selected: ArticleSelectedOptions;
	changeSetting: (value: OptionType, key: string) => void;
	resetSetting?: () => void;
	applySettings?: () => void;
};

export const ArticleParamsForm = (props: ArticleParamsProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const settingsAside = useRef<HTMLElement | null>(null);

	function toggleOpen() {
		setIsOpen(!isOpen);
		if (!isOpen) {
			settingsAside.current?.classList.add(styles.container_open);
		} else {
			settingsAside.current?.classList.remove(styles.container_open);
		}
	}

	function handleClickOutside(event: MouseEvent) {
		if (
			settingsAside.current?.classList.contains(styles.container_open) &&
			!settingsAside.current.contains(event.target as Node)
		) {
			toggleOpen();
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleOpen} />
			<aside className={styles.container} ref={settingsAside}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
					}}>
					<Text
						children={'задайте параметры'}
						size={31}
						uppercase={true}
						weight={800}></Text>
					<Select
						title='шрифт'
						selected={props.selected.fontFamily}
						options={props.options.fontFamilies}
						onChange={(value) =>
							props.changeSetting(value, 'fontFamilyOption')
						}></Select>
					<RadioGroup
						selected={props.selected.fontSize}
						options={props.options.fontSizes}
						onChange={(value) => props.changeSetting(value, 'fontSizeOption')}
						name='radio-box'
						title='размер шрифта'></RadioGroup>
					<Select
						title='цвет шрифта'
						selected={props.selected.color}
						options={props.options.fontColors}
						onChange={(value) =>
							props.changeSetting(value, 'fontColor')
						}></Select>
					<Separator></Separator>
					<Select
						title='цвет фона'
						selected={props.selected.backgroundColor}
						options={props.options.backgroundColors}
						onChange={(value) =>
							props.changeSetting(value, 'backgroundColor')
						}></Select>
					<Select
						selected={props.selected.contentWidth}
						options={props.options.contentWidths}
						onChange={(value) =>
							props.changeSetting(value, 'contentWidth')
						}></Select>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={props.resetSetting}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={props.applySettings}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
