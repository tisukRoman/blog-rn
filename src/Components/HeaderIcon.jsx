import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
import {Ionicons} from '@expo/vector-icons'

export const HeaderIcon = props => <HeaderButton {...props} iconSize={24} IconComponent={Ionicons} color={props.color}/>