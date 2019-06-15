function notNull(param) {
	if (param != null && param != '' && typeof(param) != "undefined") {
		return true;
	}
	return false
}
