import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { store } from './home-store.js';
import { FeatureService } from './feature-service.js';
import { FeatureView } from './feature-view.js';

const state = (store) => ({ featureService: new FeatureService(store.feature), feature: store.feature });

const featureFormChanged = (target) => ({ type: 'FEATURE_FORM_CHANGED', target });
const featureServiceResponded = (response) => ({ type: 'FEATURE_SERVICE_RESPONDED', response });

const actions = { featureFormChanged, featureServiceResponded };

export const FeatureContainer = connect(state, actions)(FeatureView);
